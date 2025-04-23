import { useTransitionRouter } from 'next-view-transitions';

export default function MeuBotao() {
  const router = useTransitionRouter();

  return (
    <button onClick={() => router.push('/sobre')}>
      Ir para Sobre
    </button>
  );
}
