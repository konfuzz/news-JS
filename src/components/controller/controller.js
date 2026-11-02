import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e, callback) {
        const newsContainer = e.currentTarget;
        const sourceItem = e.target.closest('.source__item');

        if (!sourceItem) {
            return;
        }

        const sourceId = sourceItem.getAttribute('data-source-id');

        if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp(
                {
                    endpoint: 'everything',
                    options: {
                        sources: sourceId,
                    },
                },
                callback
            );
        }
        return;
    }
}

export default AppController;
