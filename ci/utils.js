

export function testAsync (runAsync) {
    return (done) => {
        runAsync().then(done, done.fail);
    };
}

export function test (name, runAsync) {
    return it(name, testAsync(runAsync));
}
