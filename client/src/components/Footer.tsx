import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4">
        <hr className='w-[90%] m-auto'/>
        <br />
      <p className="text-lg mb-2">Thank you for visiting</p>
      <div className="flex justify-center">
        <a href="mailto:amansharma12607@gmail.com" className="mx-2">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png" alt="mail" width="30" height="30" />
        </a>
        <a href="https://www.linkedin.com/in/aman-sharma-a37072263/" className="mx-2">
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeDdBNTUzMrUDhaPy8isZc1fS4Iz6oKQGIeuYneW2-7A&s" alt="linkedin" width="30" height="30" />
        </a>
        <a href="https://github.com/exploring-solver" className="mx-2">
          <Image src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github" width="30" height="30" />
        </a>
      </div>
      <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Aman Sharma</p>
    </footer>
  );
};

export default Footer;
