export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function (...args: any[]) {

            let unidade = emSegundos ? 's' : 'ms';
            let divisor = emSegundos ? 1000 : 1;

            console.log('-------------------------');
            console.log(`parametros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();

            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now();

            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);

            console.log(`O método ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);

            return retorno;
        }

        return descriptor;
    }
}