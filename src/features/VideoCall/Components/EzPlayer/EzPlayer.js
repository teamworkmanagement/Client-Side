import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useJitsi } from 'react-jutsu/dist';


EzPlayer.propTypes = {
    jwt: PropTypes.string,
    domain: PropTypes.string,
    subject: PropTypes.string,
    password: PropTypes.string,
    roomName: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    onMeetingEnd: PropTypes.func,
    loadingComponent: PropTypes.object,
    errorComponent: PropTypes.object,
    containerStyles: PropTypes.object,
    jitsiContainerStyles: PropTypes.object,
    configOverwrite: PropTypes.object,
    interfaceConfigOverwrite: PropTypes.object,
    onError: PropTypes.func,
    onJitsi: PropTypes.func
}

function EzPlayer({
    loadingComponent,
    errorComponent,
    containerStyles,
    jitsiContainerStyles,
    onError,
    onJitsi,
    password,
    subject,
    ...options
}) {
    const { loading, error, jitsi } = useJitsi({
        parentNode: 'jitsi-container',
        configOverwrite: {
            prejoinPageEnabled: false,
        },
        domain: 'meet.ezteam.engineer',
        subject: subject,
        ...options
    })

    useEffect(() => {
        if (jitsi && onJitsi) onJitsi(jitsi)
    }, [jitsi])

    useEffect(() => {
        if (error && onError) onError(error)
        console.log(error);
    }, [error])
    return (
        <div style={{ ...{ width: '100%', height: '550px' }, ...containerStyles }}>
            {error && (errorComponent || <p>{error}</p>)}
            {!error && loading && (loadingComponent || <p>Loading ...</p>)}
            <div
                id='jitsi-container'
                style={{
                    ...{
                        display: loading ? 'none' : 'block',
                        width: '100%',
                        height: '100%'
                    },
                    ...jitsiContainerStyles
                }}
            />
        </div>
    );
}

export default EzPlayer;
