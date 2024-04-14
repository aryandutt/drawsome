import { LuGithub } from 'react-icons/lu';

const Github = () => {
    return (
        <a
            href="https://github.com/aryandutt"
            target="_blank"
            className="flex fixed bottom-4 right-8 px-4 py-6 justify-center rounded-lg items-center w-auto h-6 bg-gray-200"
        >
            <LuGithub size={'1.5em'} style={{ opacity: 0.8 }} />
            <div className="ml-5 font-mono font-thin tracking-wide opacity-80">
                Aryan Dutt
            </div>
        </a>
    );
};

export default Github;
