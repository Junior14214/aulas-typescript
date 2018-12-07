import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/index';
import { NegociacaoService } from '../service/index';
import { imprime } from '../helpers/index'
export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView', true);
    private _service = new NegociacaoService();

    constructor() {

        this._negociacoesView.update(this._negociacoes);

    }

    @throttle()
    adiciona(): void {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação cadastradas com sucesso!");

    }

    private _ehDiaUtil(data: Date) {

        return data.getDay() != diaDaSemana.Sábado && data.getDate() != diaDaSemana.Domingo;
    }

    @throttle()
    async importaDados() {

        try {

            const negociacoesParaImportar = await this._service.obterNegociacoes(res => {
                if (res.ok) {
                    return res
                } else {
                    throw new Error(res.statusText);
                }
            });

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar.
                filter(negociacao => !negociacoesJaImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch (error) {
            this._mensagemView.update(error.message);
        }
    }
}

enum diaDaSemana {

    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sábado
}