import Reveal from "@/components/Reveal";

const emailUser = "arnovannieuwenhuyzen";
const emailDomain = "outlook.com";
const email = `${emailUser}@${emailDomain}`;

export default function Contact() {
  return (
    <section id="contact" className="py-16 text-left">
      <Reveal>
        <h2 className="text-2xl font-semibold">Contact</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-6 max-w-2xl">
          For any inqueries feel free to send me a message
        </p>
        <a className="mt-4 inline-block" href={`mailto:${email}`}>
          {email}
        </a>
      </Reveal>
    </section>
  );
}
