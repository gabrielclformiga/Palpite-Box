import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/PageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
  const { data, error } = useSWR('/api/get-promo', fetcher);
  return (
    <div>
      <PageTitle title="Seja bem-vindo"></PageTitle>

      <p className="mt-12 text-center">
        O Restaurante X sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.
      </p>

      <div className="mt-12 text-center my-12">
        <Link href="/pesquisa">
          <a className="bg-blue-400 px-10 py-4 rounded-lg shadow-lg hover:shadow font-bold">Dar opnião ou sugestão</a>
        </Link>
      </div>

      {!data && <p>Carregando...</p>}
      {!error && data && data.showCoupon &&
        <p className="font-bold mt-12 mb-6 text-center">
          {data.message}
        </p>
      }
    </div>
  );
}

export default Index