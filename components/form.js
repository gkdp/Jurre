import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [inputs, setInputs] = useState({
    email: '',
    message: '',
  });

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        email: '',
        message: '',
      });
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };

  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: 'POST',
      url: 'https://formspree.io/mzbjndev',
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          'Bedankt! Uw bericht is verstuurd.'
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="email" className="label">E-mail</label>
      <input
        id="email"
        type="email"
        name="_replyto"
        className="input"
        onChange={handleOnChange}
        required
        value={inputs.email}
      />

      <label htmlFor="message" className="label">Bericht</label>
      <textarea
        id="message"
        name="message"
        className="input"
        onChange={handleOnChange}
        required
        rows="7"
        value={inputs.message}
      />

      <div className="button">
        <button type="submit" disabled={status.submitting} className="btn">
          {!status.submitting
            ? !status.submitted
              ? 'Verstuur'
              : 'Verstuurd'
            : 'Aan het versturen...'}
        </button>
      </div>

      {status.info.error && (
        <div className="error">Fout: {status.info.msg}</div>
      )}
      {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
        }

        .label {
          margin-bottom: .5rem!important;
          font-weight: 700!important;
        }

        .input {
          padding-left: .75rem!important;
          padding-right: .75rem!important;
          padding-top: .5rem!important;
          padding-bottom: .5rem!important;
          border-radius: .2rem!important;
          appearance: none!important;
          border: 1px solid #e2e8f0;
          font-family: inherit;
          font-size: 100%;
          line-height: 1.15;
          margin: 0;
        }

        .input ~ .label {
          margin-top: 1rem;
        }

        .btn {
          padding-left: 1rem!important;
          padding-right: 1rem!important;
          padding-top: .5rem!important;
          padding-bottom: .5rem!important;
          border-radius: .2rem!important;
          background-color: #4299e1!important;
          --bg-opacity: 1!important;
          background-color: rgba(66,153,225,var(--bg-opacity))!important;
          color: #fff!important;
          --text-opacity: 1!important;
          color: rgba(255,255,255,var(--text-opacity))!important;
          border: 0;
          -webkit-appearance: button;
          text-transform: none;
          overflow: visible;
          font-family: inherit;
          font-size: 100%;
          line-height: inherit;
          margin: 1.5rem 0 0;
          cursor: pointer;
          width: auto;
        }
        .btn:hover {
          background-color: #2b6cb0!important;
          --bg-opacity: 1!important;
          background-color: rgba(43,108,176,var(--bg-opacity))!important;
        }
      `}</style>
    </form>
  );
};

export default Form;
