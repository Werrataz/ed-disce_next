'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const coursePID = useParams().coursePID;
    return (
        <div>
            <button onClick={() => router.push(`${coursePID}/notes`)}>Modifier</button>
            <div className='secondary-otr9234'>
                <button onClick={() => router.push('/')}>Mémoriser</button>
                <button onClick={() => router.push('/reviser')}>S'exercer</button>
            </div>
            <div className='small-buttons-smbt56'>
                <button onClick={() => router.push(`${coursePID}/flashcard`)}>Voir la liste des flashcards</button>
                <button onClick={() => router.push(`${coursePID}/access`)}>Gérer les accès au cours</button>
            </div>
        </div>
    );
};

export default Page;