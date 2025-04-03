import style from './Style-SobreNos.module.css'
import SobreNosCard from '../SobreNosCard/SobreNosCard'
import kodecneTecnology from '../../assets/images/kodecne-tecnology-pp.png'

export function SobreNos() {
    return (
        <>
            <div className={style.AlinhaImgAoCentro}><img src={kodecneTecnology} alt="" className={style.kodecneTecnologyLogo}/></div>
            <SobreNosCard title='Sobre Nós' description='Bem-vindo, dev! A Kodecne nasceu com um propósito claro: conectar desenvolvedores do mundo todo em um único espaço, onde ideias ganham vida, colaborações acontecem e oportunidades surgem. Mais do que uma rede social, somos uma comunidade interativa, feita por devs, para devs.' lightedtext='feita por devs, para devs'/>
            <SobreNosCard title='Visão' description='A Kodecne busca ser a maior e mais engajada rede social para desenvolvedores, conectando talentos de todo o mundo, impulsionando a colaboração e transformando conhecimento em inovação. Nossa visão é criar um espaço onde cada dev possa crescer profissionalmente, encontrar oportunidades e impactar o mercado de tecnologia.'/>
            <SobreNosCard title='Missão' description='Empoderar desenvolvedores de todos os níveis, criando um espaço onde possam aprender, colaborar e crescer profissionalmente. Acreditamos que a inovação nasce da colaboração, e é por isso que oferecemos um ambiente dinâmico para troca de conhecimento, divulgação de projetos e conexão direta entre desenvolvedores e empresas. Unindo devs, compartilhando conhecimento, transformando o futuro da tecnologia.' lightedtext='Unindo devs, compartilhando conhecimento, transformando o futuro da tecnologia.'/>
            <SobreNosCard title='Quem Somos?' description='A Kodecne nasceu de uma ideia ousada dentro de uma startup: criar um espaço onde desenvolvedores pudessem se conectar, crescer e transformar o futuro da tecnologia juntos. O que começou como um projeto acadêmico se tornou uma iniciativa visionária, com um propósito claro: impactar o mercado tech com inovação e colaboração. Acreditamos no nosso potencial e no impacto da Kodecne no mercado. Estamos prontos para crescer, evoluir e transformar o ecossistema tech. O futuro da tecnologia começa aqui.' lightedtext='Acreditamos no nosso potencial e no impacto da Kodecne no mercado. Estamos prontos para crescer, evoluir e transformar o ecossistema tech. O futuro da tecnologia começa aqui'/>
        </>
    )
}