"use client";
import Head from "next/head";
import { useState } from "react";
import Editor from "@/components/Editor";




export default function Page() {

    const toggleDisplayHistory = event => {
        setDisplayHistory(event.target.checked);
    };

    const toggleOperators = event => {
        setOperators(event.target.checked ? CUSTOM_OPERATORS : []);
    };

    return (
        <div>
            <Head>
                <title>mathquill4quill Nextjs Demo</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Editor key={1} />
                <Editor key={2} />

            </main>

            <footer>
                <a href="https://github.com/c-w/mathquill4quill">
                    <p>Fork me on Github</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        width="149"
                        height="149"
                        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
                        alt="Fork me on GitHub"
                    />
                </a>
                <Editor key={3} />

            </footer>
        </div>
    );
}