import {useEffect, useState} from 'react';

const Alert = ({isActive, status,}) => {
    let [activeState, setActiveState] = useState(isActive);

    useEffect(() => {
        setActiveState(isActive);
    }, [isActive])

    return (
        <div
            className={`alert absolute top-0  flex items-center  ${!activeState ? 'opacity-0 -right-64' : 'right-0 opacity-1'} ${status?.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.99967 13.6654C3.31767 13.6654 0.333008 10.6807 0.333008 6.9987C0.333008 3.3167 3.31767 0.332031 6.99967 0.332031C10.6817 0.332031 13.6663 3.3167 13.6663 6.9987C13.6663 10.6807 10.6817 13.6654 6.99967 13.6654ZM6.33301 8.9987V10.332H7.66634V8.9987H6.33301ZM6.33301 3.66536V7.66536H7.66634V3.66536H6.33301Z"
                    fill="#D92D20"/>
            </svg>

            <span className="text-red-500 ml-3">{status?.message || ''}</span>
        </div>
    );
};

export default Alert;