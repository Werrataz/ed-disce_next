import React, { useState } from 'react';
import mergeDelta from '@/functions/delta';
import LANG from '@/config/language.config';

const Page = () => {
    const [delta, setDelta] = useState({});
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };
    return (
        <div>
            <h1>New Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:
                    <input type="text" id="title" value={delta.title} onChange={(event) => mergeDelta(delta, setDelta, { title: event.target.value })} />
                </label>
                <label htmlFor="academicLevel">Academic Level:
                    <select value={delta.academicLevel} onChange={(event) => mergeDelta(delta, setDelta, { academicLevel: event.target.value })}>
                        {Object.values(LANG.academicLevel).map(([key, value]) => {
                            <option value={key}>{value}</option>
                        })}
                    </select>
                </label>
                <label htmlFor="subjectStudied">Subject Studied:
                    <select value={delta.subjectStudied} onChange={(event) => mergeDelta(delta, setDelta, { subjectStudied: event.target.value })}>
                        {Object.values(LANG.academicLevel).map(([key, value]) => {
                            <option value={key}>{value}</option>
                        })}
                    </select>
                </label>
                <label htmlFor="school">School:
                    <input type="text" id="school" value={delta.school} onChange={(event) => mergeDelta(delta, setDelta, { school: event.target.value })} />
                </label>
                <label htmlFor="training">Training:
                    <input type="text" id="training" value={delta.training} onChange={(event) => mergeDelta(delta, setDelta, { training: event.target.value })} />
                </label>
                <label htmlFor="file">Upload Document:
                    <input type="file" id="file" onChange={handleFileChange} />
                </label>
                {documentUploaded && <p>Le cours sera prégénéré à partir des documents que vous avez fourni</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Page;