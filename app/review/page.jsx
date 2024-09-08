'use client';
import React, { useState } from 'react';
import useManageReview from '@/hooks/manageReview';
import { mergeDelta } from '@/functions/merge';
import Loader from '@/components/Loader';
import Editor from '@/components/Editor';

const Page = () => {

    const { delta, setDelta, flashcard, setFlashcard, trigger, setTrigger, state, setState } = useManageReview();

    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    const handleAnswer = () => {
        setIsAnswerVisible(true);
    };

    const handleMasteryLevel = (level) => {
        mergeDelta(flashcard, setFlashcard, { lastMasteryLevel: level }); // déclanche un useEffect dans useManageReview
        mergeDelta(delta, setDelta, { flashcard: flashcard });
        setTrigger(trigger + 1);
        setIsAnswerVisible(false);
    };

    return (
        <Loader state={state}>
            <h1>Review</h1>
            {flashcard && (
                <div className='container-review-cnriw057'>
                    <Editor value={flashcard.question} disabled={true} />
                    {!isAnswerVisible &&
                        <div className='level-div-led230'>
                            <button onClick={handleAnswer}>Voir la réponse</button>
                        </div>
                    }
                    {isAnswerVisible &&
                        <Editor value={delta.flashcard.answer} disabled={true} />
                    }
                    {isAnswerVisible &&
                        <div className='mastery-level-div-amlfd1230'>
                            <button onClick={() => handleMasteryLevel('L')}>à revoir</button>
                            <button onClick={() => handleMasteryLevel('M')}>moyen</button>
                            <button onClick={() => handleMasteryLevel('H')}>bien</button>
                            <button onClick={() => handleMasteryLevel('P')}>parfait</button>
                        </div>
                    }
                </div>
            )}
        </Loader>
    );
};

export default Page;