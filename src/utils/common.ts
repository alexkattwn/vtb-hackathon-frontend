// получение ширины экрана
export const getWindowWidth = () => {
    const { innerWidth: windowWidth } = typeof window !== 'undefined' ? window : { innerWidth: 0 }

    return { windowWidth }
}