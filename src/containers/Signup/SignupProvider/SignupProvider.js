import React from 'react';
import { Form } from 'reactstrap';
import MyInput from '../../../components/UI/MyInput/MyInput';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';


class SignupProvider extends React.Component {

    state = {
        type: "provider",
        formControls: {
            email: {
                rules: {
                    required: true,
                    isEmail: true
                },
                id: "signup_prov_email",
                name: "Email",
                value: '',
                type: "text",
                placeholder: "hotel@hotel.com",
                feedback: null,
                validity: ''
            },

            password: {
                rules: {
                    required: true,
                    isPassword: true,
                    minLength: 6,
                    maxLength: 15
                },
                id: "signup_prov_pwd",
                name: "Κωδικός",
                value: '',
                type: "password",
                placeholder: 'Password',
                feedback: null,
                validity: ''
            },

            password1: {
                rules: {
                    required: true,
                    mustMatch: "password"
                },
                id: "signup_prov_pwd_rep",
                name: "Επιβεβαίωση Κωδικού",
                value: '',
                type: "password",
                placeholder: 'Confirm Password',
                feedback: null,
                validity: ''
            },

            providername: {
                rules: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                id: "signup_prov_name",
                name: "Επωνυμία επιχείρησης",
                value: '',
                type: "text",
                placeholder: "Hotel Brand",
                feedback: null,
                validity: ''
            }
        }
    }

    render(){

        const formElementsArray = [];
        for ( let key in this.state.formControls ) 
        {
            formElementsArray.push( {
                id: key,
                config: this.state.formControls[key]
            });
        }

        let formFields = formElementsArray.map( formElement => (
            <MyInput
                key={formElement.id}
                id={formElement.config.id}
                name={formElement.config.name}
                value={formElement.config.value}
                type={formElement.config.type}
                placeholder={formElement.config.placeholder}
                feedback={formElement.config.feedback}
                validity={formElement.config.validity}
                changed={( event ) => this.props.inputChangedHandler( event, this, formElement.id )} 
                blurred={( event ) => this.props.inputBlurredHandler ( event, this, formElement.id )}
            />
        ));

        return (
            <Form onSubmit={( event ) => this.props.submitHandler(event, this)}>

                {formFields}

                <SubmitBtn classes="float-right">
                    Εγγραφή
                </SubmitBtn>
            </Form>
        );
    }

}

export default SignupProvider;