import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {formsControls} from "../../common/FormsControls/FormsControls"
import classes from '../../common/FormsControls/FormsControls.module.scss'
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {

    return <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error && <div className={classes.formSummaryError}>
            {error}
        </div>
        }
        <div> Full Name:
            <Field typeFild={'input'} name={'fullName'}
                   component={formsControls} />
        </div>
        <div>
            Looking for a job:
            <Field typeFild={'input'} name={'lookingForAJob'}
                   component={formsControls} type={'checkbox'} />
        </div>
        <div>
            My professional skills:
            <Field typeFild={'textarea'} name={'lookingForAJobDescription'}
                   component={formsControls} />
        </div>
        <div>
            About me:
            <Field typeFild={'textarea'} name={'aboutMe'}
                   component={formsControls} />
        </div>
        <div>
            Contacts: {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    {key}: <Field typeFild={'input'} name={'contacts.' + key}
                                   component={formsControls}/>
                </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
    form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm