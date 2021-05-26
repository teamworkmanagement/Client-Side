import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import { EditorState } from 'draft-js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import teamApi from 'src/api/teamApi';
import { getResetEditorState } from 'src/utils/draftjs';
import './PostEditor.scss';
import editorStyles from './SimpleMentionEditor.module.css';


function PostEditor(props) {
    const editorRef = useRef();
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [mentions, setMentions] = useState([]);


    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);


    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
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

    useEffect(() => {
        if (props.reset < 0)
            return;

        props.onAddPost(editorState);
        const newState = getResetEditorState(editorState);
        setEditorState(newState);
    }, [props.reset])


    useEffect(() => {
        console.log(props.postTeamId);
        /*teamApi.getAllUserByTeam(props.postTeamId)
            .then(res => {
                const myDatas = res.data.map(x => {
                    return {
                        name: x.userFullname,
                        id: x.userId,
                        avatar: x.userImageUrl,
                    }
                })
                console.log(myDatas);
                setMentions(myDatas);
            }).catch(err => {

            })*/
    }, [props.postTeamId])

    return (
        <div onClick={() => {
            editorRef.current.focus();
        }} className={editorStyles.editor}>
            <Editor ref={editorRef}
                editorKey={'editor'}
                editorState={editorState}
                onChange={onChange}
                plugins={plugins}
                placeholder="Viết bài..."
            />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />
        </div>
    );
}

export default PostEditor;