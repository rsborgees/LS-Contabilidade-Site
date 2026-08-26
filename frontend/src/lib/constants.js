export const COMPANY_NAME = 'LS Contabilidade'
export const SLOGAN = 'Contabilidade especializada em prestação de serviços, comércio e farmácias'

export const PHONE_DISPLAY = '(71) 98427-6978'
export const PHONE_TEL = '+5571984276978'
export const EMAIL = 'lscontabilidade9@gmail.com'

export const ADDRESS_LINES = [
  'Av. Luís Viana (Paralela), 13.223',
  'Hangar Business Park, Torre 07',
  'Salvador/BA — CEP 41500-300',
]

// Coordenadas exatas do Hangar Business Park extraídas do link do Google Maps
// enviado pelo cliente: https://maps.app.goo.gl/BFKNFmTgQvctJKUc8
export const MAPS_EMBED_SRC = 'https://www.google.com/maps?q=-12.9193089,-38.3551065&z=17&output=embed'

export const STREET_VIEW_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1sfKUzlzlEHRNDt5CMs5sqBA!2m2!1d-12.9201776!2d-38.3549333!3f319.7583884767765!4f-1.433052884689232!5f150'

export const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=-12.9193089,-38.3551065'

export function buildWhatsappUrl(message) {
  const defaultMessage = 'Olá! Gostaria de saber mais sobre os serviços da LS Contabilidade.'
  const text = encodeURIComponent(message || defaultMessage)
  return `https://wa.me/5571984276978?text=${text}`
}
