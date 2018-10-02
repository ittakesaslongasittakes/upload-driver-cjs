import xs from 'xstream';
export const makeUploadDriver = () => {
    let reader = new FileReader();
    const uploadDriver = sink$ => {
        sink$.addListener({
            next: outgoing => {
                const files = outgoing.target.files;
                // Array.from(files).map(file => {
                //     reader.readAsDataURL(file);
                // });
                reader.readAsDataURL(files[0]);
            },
            error: () => {},
            complete: () => {}
        });
        return xs.create({
            start: listener => {
                reader.addEventListener('load', function(msg) {
                    listener.next(msg);
                });
            },
            stop: () => {}
        });
    };
    return uploadDriver;
};
