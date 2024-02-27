
const Footer = () => {
  return (
    <footer className="flex items-center h-14 border-t px-6 gap-4 lg:h-[60px] dark:border-gray-800">
      <p className="hidden md:flex text-sm text-gray-500">© 2023 Acme Inc. All rights reserved.</p>
      <nav className="flex-1 flex items-center justify-end gap-4 text-sm font-medium">
        <a className="hover:underline" href="#">
          Terms &amp; Conditions
        </a>
        <a className="hover:underline" href="#">
          Privacy Policy
        </a>
        <a className="hover:underline" href="#">
          Contact Us
        </a>
      </nav>
    </footer>
  )
}

export default Footer