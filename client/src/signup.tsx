import React, { useState } from "react";

const Signup: React.FC = () => {
    const [fullName, setfullName] = useState('');
    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState<boolean | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:226',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ FullName: fullName, Mail: mail }),
                });

            const text = await response.text();
            if (response.ok) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
            setMessage(text);
        } catch (err) {
            setSuccess(false);
            setMessage('Submission Failed. Please try again later.');
        }
    };
    return (
        <div className="container mt-5 middle" style={{ maxWidth: '400px' }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flexbox">
                    <h6>Sign up to my newsletter!</h6>
                </div>
                <div className="mb-3">
                    <input type='text'
                        name='FullName'
                        className="form-control"
                        placeholder="Enter your full name: "
                        value = {fullName}
                        onChange={(e) => setfullName(e.target.value)}
                        required />
                </div>
                <div className="mb-3">
                    <input
                        type='email'
                        name='Mail'
                        className='form-control'
                        placeholder="Enter Your Email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary w-100">Sign Up</button>
                {message && <p className='mt-3 text-center'>{message}</p>}
            </form>

            {success !== null && (
                <div className={`p-5 mt-4 border rounded-3 ${success ? 'bg-light text-success border-success' : 'bg-light text-danger border-danger'}`}
                >
                    <h4 className="text-center">{success? 'Success!': 'Oops!'}</h4>
                    <p className="text-center mb-0">{message}</p>
                </div>
            )}
        </div>
    );
};
export default Signup;