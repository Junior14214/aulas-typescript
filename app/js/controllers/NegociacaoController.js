System.register(["../models/index", "../views/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, NegociacaoController, diaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView('#negociacoesView', true);
                    this._mensagemView = new index_2.MensagemView('#mensagemView', true);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update('Somente negociações em dias úteis');
                        return;
                    }
                    const negociacao = new index_1.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update("Negociação cadastradas com sucesso!");
                }
                _ehDiaUtil(data) {
                    return data.getDay() != diaDaSemana.Sábado && data.getDate() != diaDaSemana.Domingo;
                }
            };
            exports_1("NegociacaoController", NegociacaoController);
            (function (diaDaSemana) {
                diaDaSemana[diaDaSemana["Domingo"] = 0] = "Domingo";
                diaDaSemana[diaDaSemana["Segunda"] = 1] = "Segunda";
                diaDaSemana[diaDaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
                diaDaSemana[diaDaSemana["Quarta"] = 3] = "Quarta";
                diaDaSemana[diaDaSemana["Quinta"] = 4] = "Quinta";
                diaDaSemana[diaDaSemana["Sexta"] = 5] = "Sexta";
                diaDaSemana[diaDaSemana["S\u00E1bado"] = 6] = "S\u00E1bado";
            })(diaDaSemana || (diaDaSemana = {}));
        }
    };
});
