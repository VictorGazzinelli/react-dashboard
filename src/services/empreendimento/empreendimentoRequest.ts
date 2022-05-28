import { IEmpreendimentoDto, IObterEmpreendimentoInput, IObterEmpreendimentoOutput} from './empreendimentoInterface';

export default class empreendimentoRequest {

	static Empreendimentos : Array<IEmpreendimentoDto> = [
		{
			IdEmpreendimento: 1,
			Nome: 'Empreendimento 1'
		}
	]
	
	static ObterEmpreendimento(dto: IObterEmpreendimentoInput): Promise<IObterEmpreendimentoOutput>{
		return new Promise((resolve, reject) => {
			resolve({ Empreendimento: this.Empreendimentos[0]})
		})
	}

}