import moment from 'moment';

moment.updateLocale('en', {
    relativeTime: {
        future: "em %s",
        past: "%s atras",
        s: 'alguns segundos',
        ss: '%d segundos',
        m: "um minuto",
        mm: "%d minutos",
        h: "uma hora",
        hh: "%d horas",
        d: "um dia",
        dd: "%d dias",
        w: "uma semana",
        ww: "%d semanas",
        M: "um mês",
        MM: "%d meses",
        y: "um ano",
        yy: "%d anos"
    }
});

export default moment;