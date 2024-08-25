'use client'

import type {MetaFunction} from "@remix-run/node";
import Welcome from '../components/welcome/Welcome';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
    return (
        <div>
           <Welcome/>
        </div>
    );
}
