/**
 * cpu的运行
 */


function render() {
    var _ = require('lodash');
    var ps = require('current-processes');

    ps.get(function (err, processes) {

        var sorted = _.sortBy(processes, 'cpu');
        var top5 = sorted.reverse().splice(0, 5);
        var xList = top5.map(item => item.name)
        var yList = top5.map(item => item.cpu)


        var blessed = require('blessed')
            , contrib = require('blessed-contrib')
            , screen = blessed.screen()
            , line = contrib.line(
                {
                    style:
                    {
                        line: "yellow"
                        , text: "green"
                        , baseline: "black"
                    }
                    , xLabelPadding: 3
                    , xPadding: 5
                    , label: 'cpu'
                })
            , data = {
                x: xList,
                y: yList
            }
        screen.append(line) //must append before setting data
        line.setData([data])

        screen.key(['escape', 'q', 'C-c'], function (ch, key) {
            return process.exit(0);
        });

        screen.render()

    });
}

setInterval(render,1000)

render()





