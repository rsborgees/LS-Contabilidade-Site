const clientLogoUrls = import.meta.glob('../assets/clients/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
})

function urlFor(fileName) {
  const entry = Object.entries(clientLogoUrls).find(([path]) => path.endsWith(fileName))
  if (!entry) {
    throw new Error(`Logo de cliente não encontrado: ${fileName}`)
  }
  return entry[1]
}

const CLIENT_FILES = [
  ['071-film.jpeg', '071 Film'],
  ['dinamo-transporte-logistica.jpg', 'Dínamo Transporte e Logística'],
  ['espaco-maternar.jpeg', 'Espaço Maternar'],
  ['farmacia-guerra.jpg', 'Farmácia Guerra'],
  ['fusion-studio-pilates.png', 'Fusion Studio de Pilates'],
  ['gabarito-auto-pecas.jpg', 'Gabarito Auto Peças'],
  ['manusocorro-construcao-civil.png', 'Manusocorro Serviços de Construção Civil'],
  ['ti-ideal.png', 'TI Ideal'],
  ['vge-transportadora.jpeg', 'VGE Transportadora'],
  ['bahia-tech-notebooks.webp', 'Bahia Tech Notebooks'],
  ['banco-cora.png', 'Banco Cora'],
  ['clinesf.jpeg', 'Clinesf'],
  ['eletromed.jpg', 'Eletromed'],
  ['facility-refrigeracao.jpg', 'Facility Refrigeração'],
  ['farma-boa-vida.jpg', 'Farma Boa Vida'],
  ['farmacia-popular-da-gente.jpeg', 'Farmácia Popular da Gente'],
  ['farmanova.webp', 'Farmanova'],
  ['fito-flora.jpg', 'Fito Flora'],
  ['franco-confeitaria.jpg', 'Franco Confeitaria'],
  ['grupo-evo.jpeg', 'Grupo Evo'],
  ['farmacias-fort-popular.jpeg', 'Farmácias Fort Popular'],
  ['jr-cirurgia.png', 'JR Cirurgia'],
  ['kalio-construtora.avif', 'Kalio Construtora'],
  ['soften-sistemas.svg', 'Soften Sistemas'],
  ['master-climatizacao.jpg', 'Master Climatização'],
]

export const CLIENTS = CLIENT_FILES.map(([fileName, name]) => ({
  name,
  logo: urlFor(fileName),
}))
