export interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    termsAccepted: boolean;
    picture: string;
    country: string;

  }

  export interface SubmitFormAction {
    type: 'SUBMIT_FORM';
    payload: FormData;
  }
  
  export type Action = SubmitFormAction;
  
  export interface RootState {
    formData: FormData[];
  }