import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter
} from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import { EditorState, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from 'src/api/userApi';
import { getResetEditorState } from 'src/utils/draftjs';
import './TaskCommentInput.scss';




function TaskCommentInput(props) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const user = useSelector(state => state.auth.currentUser);
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [mentions, setMentions] = useState([]);


    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin(
        );
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const onOpenChange = useCallback((_open) => {
        setOpen(_open);
    }, []);


    const onSearchChange = useCallback(({ value }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, [mentions]);

    const onChange = (e) => {
        setEditorState(e);
    }

    const keyBindingFn = (e) => {
        if (e.keyCode === 13) {
            if (e.nativeEvent.shiftKey) {
                console.log('shift enter');
            } else {
                console.log('enter');

                return 'custom-input-save';
            }
        }

        return getDefaultKeyBinding(e);
    }

    const handleKeyCommand = (command) => {
        if (command === 'custom-input-save') {
            props.saveContent(editorState);


            const newState = getResetEditorState(editorState);
            setEditorState(newState);
        }
        return 'not-handled';
    }

    useEffect(() => {
        async function getDatas() {
            if (props.boardId) {
                const params = {
                    boardId: props.boardId,
                };

                const res = await userApi.searchUsersKanban({ params });


                const newMentions = res.data.map(x => {
                    return {
                        name: x.userFullname,
                        id: x.userId,
                        avatar: x.userImageUrl,
                    }
                });

                setMentions(newMentions);
            }
        }

        getDatas();
    }, [props.boardId])

    return (
        <div className="custom-input-container">
            <Editor
                placeholder="Viết bình luận..."
                className="editor"
                editorKey={'editor'}
                editorState={editorState}
                onChange={onChange}
                plugins={plugins}
                keyBindingFn={keyBindingFn}
                handleKeyCommand={handleKeyCommand}
            />

            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                onAddMention={() => {

                }}
            />
        </div>
    );
}

export default TaskCommentInput;