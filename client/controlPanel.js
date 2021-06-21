
class ControlPanel {

    constructor() {
        //this.zoom = createSlider(0.5, 3.0, 1.0, 0.1);
        this.zoom = new Zoom();

    }

}

class Zoom {
    constructor() {
        this.scaleFactor = 1.0;
        this.zoomScale = 1.0;
        this.gainedZoom = 0;

        window.addEventListener("wheel", function (e) {
            // if(mouseChangedPos()) {
            //     console.log(`mudou (${mouseX} ${mouseY}), (${mx} ${my})`);
            // }
            // else {
            //     console.log(`mouse no mesmo lugar`);
            // }
            let oldZoom = panel.zoom.value();
            const zoomChange = (e.deltaY > 0) ? 0.95 : 1.05;
            panel.zoom.changeZoomScale(zoomChange);
            
        });
    }


    update(canv) {
        if(keyIsDown(32)) return;

        let hw = width/2;
        let hh = height/2;
        let nx = hw - pos.x;
        let ny = hh - pos.y;
        canv.translate(nx, ny);
        // console.log(`translate ${nx} ${ny}`);
        canv.scale(this.value());
        canv.translate(-nx, -ny);
    }

    changeZoomScale(multiplier) {
        this.scaleFactor *= multiplier;
        if(this.scaleFactor < 0.1) {
            this.scaleFactor = 0.1;
        }
        //zoomed.scale(1.0 / panel.zoom.value());
    }

    value() {
        return this.scaleFactor;
    }

    ivalue() {
        return 1 / this.scaleFactor;
    }

    old_update() {
        let pt = createVector(
            pos.x - width * 0.5 * panel.zoom.value(),
            pos.y - height * 0.5 * panel.zoom.value()
        );
        let p = createVector(pos.x, pos.y);
        let hw = width/2;
        let hh = height/2;
        let mr = createVector(
            pos.x + (mouseX - hw) * panel.zoom.value(),
            pos.y + (mouseY - hh) * panel.zoom.value()
        );
        let pf = p5.Vector.add(pt, mr);

        let oldZoom = panel.zoom.value();
        const zoomChange = (e.deltaY > 0) ? 0.95 : 1.05;
        panel.zoom.changeZoomScale(zoomChange);

        let vals = [
            zoomChange,
            1-zoomChange,
            panel.zoom.value(),
            panel.zoom.ivalue(),
            panel.zoom.value() / oldZoom,
            panel.zoom.value() - oldZoom,
        ];
        pf.mult(vals[1]);
        p.add(pf);
        let toshow = p;
        let tsx = round(toshow.x, 2);
        let tsy = round(toshow.y, 2);
        console.log(`vect ${tsx} ${tsy}`);
    }
}




