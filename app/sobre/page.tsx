import Link from "next/link";

const Sobre = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-4">
          Jorge Mattos consulting
        </h1>
        <p className="text-xl text-center mb-8">
          Tenha o controle de sua empresa na mão, gestão de processos e dados
        </p>
        <Link
          href="https://wa.me/5554999256992" // substitua pelo seu número de WhatsApp
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Contate-nos no WhatsApp
        </Link>
      </div>
    );
  }

  export default Sobre