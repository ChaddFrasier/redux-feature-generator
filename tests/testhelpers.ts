const commandBuilder = (command: string): string[] => {
    return command.split(' ').slice(1)
}

export const helpers = {
    injectCommand: commandBuilder
}