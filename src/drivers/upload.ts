import xs from 'xstream';
export const makeUploadDriver = () => {
    let reader = new FileReader();
    let toProcess = [];
    const uploadDriver = sink$ => {
        sink$.addListener({
            next: outgoing => {
                const files = outgoing.target.files;
                const wasEmpty = toProcess.length === 0;
                toProcess = toProcess.concat(Array.from(files));
                if(wasEmpty) {
                    reader.readAsDataURL(toProcess[0]);
                }
            },
            error: () => {},
            complete: () => {}
        });
        return xs.create({
            start: listener => {
                reader.addEventListener('load', function(msg) {
                    listener.next(msg);
                    toProcess.shift();
                    if(toProcess.length > 0) {
                        reader.readAsDataURL(toProcess[0]);
                    }
                });
            },
            stop: () => {}
        });
    };
    return uploadDriver;
};
