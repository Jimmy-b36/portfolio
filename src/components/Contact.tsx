import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Fade } from "react-reveal";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const contactForm = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 ~ sendEmail ~ contactForm.current", typeof contactForm);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID ?? "no service id",
        process.env.NEXT_PUBLIC_TEMPLATE_ID ?? "no template id",
        contactForm.current ?? "no form",
        process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "no public key"
      )
      .then((res) => {
        console.log("SUCCESS!", res.status, res.text);
      })
      .catch((err) => console.log("FAILED!", err.message));
    return contactForm.current?.reset();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 850);
  }, []);

  return (
    <Fade left>
      {isExpanded && (
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
            <h2 className="mb-4  bg-gradient-to-r from-red-200  to-pink-600  bg-clip-text text-center text-6xl font-extrabold tracking-tight text-transparent ">
              Contact me
            </h2>
            <p className="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
              I'm always looking for new & exciting opportunities. If you have
              any questions or just want to say hi, feel free to send me a
              message.
            </p>
            <form className="space-y-8" ref={contactForm} onSubmit={sendEmail}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="user_subject"
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Let us know how I can help you"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Leave a comment..."
                  name="user_query"
                ></textarea>
              </div>
              <input
                type="submit"
                value="Send message"
                className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-5 py-3 text-center text-sm font-medium text-white hover:cursor-pointer focus:outline-none focus:ring-4 sm:w-fit"
              />
            </form>
          </div>
        </section>
      )}
    </Fade>
  );
};

export default Contact;
