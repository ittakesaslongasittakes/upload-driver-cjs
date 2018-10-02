import xs from 'xstream';
export const Main = ({ DOM, onion, upload }) => {
    return {
        DOM: xs.of(
            <div>
                <input type="file" multiple />
            </div>
        ),
        onion: upload.map(e => s => {
            console.log(e.target.result);
            return e.target.result;
        }),
        upload: DOM.select('input').events('change')
    };
};
