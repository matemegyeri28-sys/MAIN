const ContactMap = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 shadow-xl">
      <iframe
        title="Megyeri Attila Autokereskedése"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.829592599958!2d19.071132476452286!3d47.53643429304852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc7ef1ea4c23%3A0xf31b8a9a1a5e7f87!2sV%C3%A1ci%20%C3%BAt%20168%2C%20Budapest!5e0!3m2!1shu!2shu!4v1700000000000!5m2!1shu!2shu"
        width="100%"
        height="380"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMap;
