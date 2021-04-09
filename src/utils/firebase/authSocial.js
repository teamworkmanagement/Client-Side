import firebaseConfig from './firebaseConfig';
const socialMediaAuth = async (provider) => {
    return await firebaseConfig.auth().signInWithPopup(provider).then(
        (res) => {
            return res;
        }
    ).catch((err) => {
        return err;
    });
};

export default socialMediaAuth;