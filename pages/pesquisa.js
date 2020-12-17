import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: "",
    Email: "",
    Whatsapp: "",
    Nota: 0
  });

  const notas = [1, 2, 3, 4, 5];

  const [success, setSuccess] = useState(false);
  const [retorno, setRetorno] = useState({});

  const save = async () => {
    try {
      if (form.Nome === "") {
        alert("Digite seu nome");
      }

      if (form.Email === "") {
        alert("Digite seu email");
      }

      if (form.Whatsapp === "" || form.Whatsapp.length < 11) {
        alert("Você não digitou todos os números do Whatsapp para enviar seus dados");
      }

      if ((form.Nome !== "") && (form.Email !== "") && (form.Whatsapp !== "") && (form.Whatsapp.length === 11) && (form.Nota !== 0)) {
        const response = await fetch("/api/save", {
          method: "POST",
          body: JSON.stringify(form)
        })
        const data = await response.json();

        setSuccess(true);
        setRetorno(data);
      }
    } catch (err) {
    }
  }
  const onChange = event => {
    const value = event.target.value;
    const key = event.target.name;
    setForm(old => ({
      ...old,
      [key]: value,
    }));
  }
  return (
    <div className="pt-6">
      <PageTitle title="Pesquisa"></PageTitle>

      <h1 className="text-center font-bold my-4 text-2xl">Críticas e sugestões</h1>

      <p className="text-center my-6">
        O Restaurante X sempre busca por atender melhor seus clientes. <br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.
      </p>

      {
        !success &&
        <div className="text-center">
          <label className="font-bold">Seu nome</label>
          <input className="mx-auto p-4 block shadow rounded bg-blue-100 my-2" type="text" placeholder="Nome" onChange={onChange} name="Nome" value={form.Nome} />

          <label className="font-bold">Seu Email</label>
          <input className="mx-auto p-4 block shadow rounded bg-blue-100 my-2" type="email" placeholder="voce@exemplo.com" onChange={onChange} name="Email" value={form.Email} />

          <label className="font-bold">Seu Whatsapp</label>
          <input className="mx-auto p-4 block shadow rounded bg-blue-100 my-2" type="tel" placeholder="Whatsapp" onChange={onChange} name="Whatsapp" value={form.Whatsapp} placeholder="(DDD)XXXXX-XXXX" maxLength="11" />

          <label className="block font-bold mt-10 text-lg">Que nota você daria para o estabelecimento?</label>

          <div className="flex justify-center mt-2 mb-6">
            {
              notas.map(nota => {
                return (
                  <label className="block mx-3">
                    {nota} <br />
                    <input onClick={onChange} type="radio" name="Nota" value={nota} />
                  </label>
                );
              })
            }
          </div>

          <input className="bg-blue-400 px-10 py-4 rounded-lg shadow-lg hover:shadow font-bold mt-6 mb-12 mx-auto" onClick={save} value="Enviar" type="submit" />
        </div>
      }
      {
        success &&
        <div className="w-1/5 mx-auto">
          <p className="mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">Obrigado por contribuir com sua sugestão ou crítica!</p>

          {
            retorno.showCoupon &&
            <div className="text-center mb-4 border-4 p-4">
              Seu cupom: <br />
              <span className="font-bold text-2xl">{retorno.Cupom}</span>
            </div>
          }

          {
            retorno.showCoupon &&
            <div className="text-center mb-6 p-4">
              <span className="font-bold">
                {retorno.Promo}
                <br /> <br />
                <span className="italic">Tire um print ou foto desta tela e apresente ao garçom!</span>
              </span>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Pesquisa;