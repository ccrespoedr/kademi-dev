var APP_NAME = 'FullStory';
var DB_NAME = 'FullStory';
var DB_TITLE = 'FullStory';
var dbType = 'json';

var recordMapping = {
    "properties": {
        "recordName": {
            "type": "text",
            "store": true
        },
        "session": {
            "type": "text",
            "store": true
        },
        "userId": {
            "type": "integer",
            "store": true
        },
        "trackingId": {
            "type": "text",
            "store": true
        },
        "savedDate": {
            "type": "date",
            "store": true
        }
    }
};

var DB_MAPPINGS = {
    record: recordMapping
};

var JSON_DB = '/jsondb';

var TYPE_RECORD = 'record';
var TYPE_DEFAULT_USER = 'DEFAULT_USER';