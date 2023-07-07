export default function FooterLayout(props) {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="py-4 text-gray-100 bg-black">
        <div className="container flex justify-between">
          <a
            href="https://kittabit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs"
          >
            &copy; {currentYear} - Built by Kittabit
          </a>
          <div className="text-white text-xs">
            Powered by
            <span className="text-gray-100"> Red Bull</span>,{' '}
            <span className="text-red-300">Love</span>, and a few{' '}
            <span className="text-pink-300">Meows</span>
          </div>
        </div>
      </footer>
    );
  }
  