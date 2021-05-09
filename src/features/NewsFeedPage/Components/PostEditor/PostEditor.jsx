import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createMentionPlugin from '@draft-js-plugins/mention';
import React, { useCallback, useMemo, useState } from 'react';
import { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import mentions from './mentionsdata';
import { EditorState } from 'draft-js';
import './PostEditor.scss';
import editorStyles from './SimpleMentionEditor.module.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import axiosClient from 'src/api/axiosClient';


const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

function PostEditor(props) {
    //const [editorState, setEditorState] = useState(createEditorStateWithText('asgsfgdfg'));

    // Creates an Instance. At this step, a configuration object can be passed in
    // as an argument.

    //const mentionPlugin = createMentionPlugin();
    //const { MentionSuggestions } = mentionPlugin;


    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );


    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);


    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [emojiPlugin, mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const onOpenChange = useCallback((_open) => {
        setOpen(_open);
    }, []);

    const onSearchChange = useCallback(({ value }) => {
        
        axiosClient.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(res=>{
            console.log(res);
        }).catch(err=>{

        })
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);

    const onChange = (e) => {
        setEditorState(e);
        props.onTextChange(e);
    }

    return (
        <div className={editorStyles.editor}>
            <Editor
                editorKey={'editor'}
                editorState={editorState}
                onChange={onChange}
                plugins={plugins}
            />
            <EmojiSuggestions />

            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />
            {/*<EmojiSelect />*/}
        </div>
    );
}

export default PostEditor;