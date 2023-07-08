export default function FooterLayout(props) {
    const { version } = require('@/package.json');

    return (
      <footer className="py-4 text-gray-100 bg-black">
        <div className="container flex justify-between">
          <a
            href="https://kittabit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs"
          >
            v{ version } - Built by Nicholas Mercer
          </a>
          <div className="text-white text-xs">
            Powered by{' '} 
            <span className="text-red-300">love</span> (and a few{' '}
            <span className="text-pink-300">toebeans</span>)
          </div>
        </div>
      </footer>
    );
  }
  