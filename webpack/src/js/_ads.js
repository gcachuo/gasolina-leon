Project.Ads = {
    init: function () {
        admob.banner.config({
            id: 'ca-app-pub-7188928306688349/4361998217',
        });

        // Create banner
        admob.banner.prepare();

        // Show the banner
        admob.banner.show();
    }
};