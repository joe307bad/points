import Modal from 'react-native-modalbox';

interface IErrorModal {
    component: any;
    instance: Modal;
    message: string;
    unauthorized: boolean;
    openModal: (message: string) => void;
    getMessage: () => string;
}

const Error: IErrorModal = {
    component: {},
    instance: {} as Modal,
    message: '',
    unauthorized: false,
    getMessage(): string {
        return this.message;
    },
    openModal(message: string) {
        this.component.setState({ message });
        this.instance.open();
    }
};

export default Error;
