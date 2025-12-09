import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Book, LogIn } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200">

            {/* HEADER */}
            <header className="w-full py-6 px-8 flex justify-between items-center shadow-sm bg-white dark:bg-zinc-900">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">SentinelLog</h1>

                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <Button
                        onClick={goToLogin}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        <Book />Documentação
                    </Button>
                    <Button
                        onClick={goToLogin}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        <LogIn />Entrar
                    </Button>
                </div>
            </header>

            {/* HERO */}
            <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-8 mt-10">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    Monitoramento inteligente, simplicidade absoluta.
                </h2>

                <p className="text-lg md:text-xl mt-6 max-w-2xl text-gray-600 dark:text-gray-300">
                    O SentinelLog oferece visibilidade completa do seu ambiente, com coleta eficiente de logs,
                    análise centralizada e painel intuitivo para decisões rápidas e seguras.
                </p>

                <button
                    onClick={() => {
                        const phone = "5547991122432";
                        const message = "Olá! Estou entrando em contato pelo SentinelLog.";
                        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                        window.location.href = url;
                    }}
                    className="mt-8 px-8 py-3 text-lg bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"
                >
                    Adquirir Sistema
                </button>
            </section>

            {/* FEATURES */}
            <section className="py-16 px-8">
                <h3 className="text-3xl font-bold text-center mb-12">
                    Por que usar o SentinelLog?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    <div className="p-8 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-zinc-800">
                        <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Centralização de Logs</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Receba todos os logs de múltiplas aplicações em um único painel, organizados por tokens.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-zinc-800">
                        <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Processamento Assíncrono</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            RabbitMQ e workers otimizados garantem alta performance no tratamento dos eventos.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-zinc-800">
                        <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Dashboard Intuitivo</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Visualização clara, filtros eficientes e busca rápida para localizar qualquer evento.
                        </p>
                    </div>
                </div>
            </section>

            {/* NEW SECTION – ADVANCED FEATURES */}
            <section className="py-20 px-8 border-t border-gray-300 dark:border-zinc-700">
                <h3 className="text-3xl font-bold text-center mb-12">Recursos Avançados</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">

                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition text-center">
                        <span className="text-4xl">🔐</span>
                        <h4 className="text-xl font-semibold mt-4 text-blue-600 dark:text-blue-400">Autenticação Segura</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Tokens exclusivos por cliente para envio seguro dos eventos.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition text-center">
                        <span className="text-4xl">📊</span>
                        <h4 className="text-xl font-semibold mt-4 text-blue-600 dark:text-blue-400">Métricas em Tempo Real</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Indicadores essenciais para monitorar atividades e anomalias.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition text-center">
                        <span className="text-4xl">⚙️</span>
                        <h4 className="text-xl font-semibold mt-4 text-blue-600 dark:text-blue-400">Configuração Simples</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Integração rápida via API com documentação clara.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition text-center">
                        <span className="text-4xl">🛡️</span>
                        <h4 className="text-xl font-semibold mt-4 text-blue-600 dark:text-blue-400">Alta Confiabilidade</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Arquitetura robusta para ambientes de alta disponibilidade.
                        </p>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 px-8 border-t border-gray-300 dark:border-zinc-700">
                <h3 className="text-3xl font-bold text-center mb-12">Como o SentinelLog funciona</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl shadow text-white">
                            1
                        </div>
                        <h4 className="text-xl font-semibold mt-6">Recebimento de Logs</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            As aplicações enviam logs para a API usando tokens exclusivos.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl shadow text-white">
                            2
                        </div>
                        <h4 className="text-xl font-semibold mt-6">Fila e Processamento</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Os eventos entram no RabbitMQ e são processados por workers assíncronos.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl shadow text-white">
                            3
                        </div>
                        <h4 className="text-xl font-semibold mt-6">Dashboard</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Logs processados são exibidos com filtros e busca avançada.
                        </p>
                    </div>
                </div>
            </section>

            {/* TECHNOLOGIES – UPDATED */}
            <section className="py-20 px-8 border-t bg-gray-100 dark:bg-zinc-950 dark:border-zinc-700">
                <h3 className="text-3xl font-bold text-center mb-12">
                    Tecnologias que impulsionam o SentinelLog
                </h3>

                <p className="text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-16">
                    Nosso ecossistema é construído com ferramentas modernas, garantindo desempenho, segurança e escalabilidade real.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    <TechCard icon="⚛️" title="React" desc="Frontend rápido e modular." />
                    <TechCard icon="🟩" title="Node.js" desc="Core do backend com Fastify." />
                    <TechCard icon="📘" title="TypeScript" desc="Código seguro e produtivo." />
                    <TechCard icon="🗄️" title="MySQL" desc="Banco relacional principal." />
                    <TechCard icon="🍃" title="MongoDB" desc="Armazenamento flexível de documentos." />
                    <TechCard icon="📬" title="RabbitMQ" desc="Mensageria robusta entre serviços." />

                </div>
            </section>

            {/* USER EVENTS SECTION */}
            <section className="py-20 px-8 border-t border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900">
                <h3 className="text-3xl font-bold text-center mb-12">
                    Por que monitorar eventos do usuário?
                </h3>

                <p className="text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-16">
                    O SentinelLog foi projetado para capturar e registrar cada ação relevante do usuário,
                    oferecendo rastreabilidade completa para auditoria, suporte técnico e tomada de decisão.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {/* Auditoria */}
                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition">
                        <span className="text-4xl">🗂️</span>
                        <h4 className="text-xl font-semibold mt-4">Auditoria Transparente</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Registre ações críticas como logins, alterações, exclusões e acessos,
                            garantindo conformidade e histórico completo.
                        </p>
                    </div>

                    {/* Segurança */}
                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition">
                        <span className="text-4xl">🛡️</span>
                        <h4 className="text-xl font-semibold mt-4">Segurança Reforçada</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Detecte comportamentos suspeitos e ações incomuns rapidamente,
                            evitando incidentes e fortalecendo a proteção do seu sistema.
                        </p>
                    </div>

                    {/* Suporte técnico */}
                    <div className="p-8 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-lg transition">
                        <span className="text-4xl">🧭</span>
                        <h4 className="text-xl font-semibold mt-4">Diagnóstico Acelerado</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            Ao saber exatamente o que o usuário fez, o suporte identifica a origem do problema
                            em segundos, reduzindo o tempo de atendimento.
                        </p>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-auto bg-gray-900 text-gray-300 py-6 text-center">
                <p>© {new Date().getFullYear()} SentinelLog — Desenvolvido por Geferson Holdorf</p>
            </footer>

            <WhatsAppFloatingButton />
        </div>
    );
};

const TechCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
    <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white dark:bg-zinc-800 hover:shadow-lg transition">
        <span className="text-4xl mb-3">{icon}</span>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">{desc}</p>
    </div>
);

const WhatsAppFloatingButton = () => {
    const phone = "5547991122432";
    const message = "Olá! Estou entrando em contato pelo SentinelLog.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6  p-4 rounded-full flex items-center justify-center z-50"
        >
            <img src={'./wpp.png'} width={80} className="hover:w-21 transition-all duration-300" />
        </a>
    );
}

export default HomePage;
