export interface Vaga {
  id?: number
	nomeEmpresa: string
	title: string
	description: string
	requisitos: string
	email?: string
	image?: string
	endDate: string
}


export interface VagaCv {
  name: string
	email: string
	contact: string
  subject: string
	image: any
}
