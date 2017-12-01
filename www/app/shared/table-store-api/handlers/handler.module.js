/*
 * Handle table and data operation for table store.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.handlers', [])
.factory('Handler', function (BASE_URL, ACCESSKEY_ID, API_VERSION, INSTANCE_NAME, SECRET_KEY, $http, protoBufferEncode, protoBufferDecode, convertProvider, md5, $base64) {
    
    var Handler = {};
    /*********************************************************/
    /* Handle request to server and process the request and   *
    /* response.                                              *
    /* @param: String operation about table & data            *
    /* @param: Object requestBody                             *  
    /* @return: Array response                                *
    /*********************************************************/
    Handler.doHandle = function (operation, requestBody) {
       
        var url = BASE_URL + operation;
        
        var requestBodyString = this.encode(requestBody, operation);        
        console.log(this.base64_md5(requestBodyString));
        var requestHeader = this.makeRequestHeader(requestBodyString, operation);
        
        var response = this.sendRequest(url, requestHeader, requestBodyString, operation)
                    
        return response;
    };

    /*********************************************************/
    /* Encode request body before sending to server.          *
    /* @param: Object requestBody                             *
    /* @param: String operation                               *  
    /* @return: ProtoBuffer                                   *
    /*********************************************************/
    Handler.encode = function (requestBody, operation) {
        var requestBodyString = '';
        switch (operation) {

            // table operations
            case 'ListTable':   requestBodyString = protoBufferEncode.encodeListTableRequest(requestBody); break;
            case 'DeleteTable': requestBodyString = protoBufferEncode.encodeDeleteTableRequest(requestBody); break;
            case 'CreateTable': requestBodyString = protoBufferEncode.encodeCreateTableRequest(requestBody); break;

            // single row operations
            case 'PutRow': requestBodyString = protoBufferEncode.encodePutRowRequest(requestBody); break;
            case 'GetRow': requestBodyString = protoBufferEncode.encodeGetRowRequest(requestBody); break;
            case 'DeleteRow': requestBodyString = protoBufferEncode.encodeDeleteRowRequest(requestBody); break;
            case 'UpdateRow': requestBodyString = protoBufferEncode.encodeUpdateRowRequest(requestBody); break;

            // multiple row operations
            case 'BatchGetRow': requestBodyString = protoBufferEncode.encodeBatchGetRowRequest(requestBody); break;
        }
        return requestBodyString;
    };

    /*********************************************************/
    /* Decode response body after receiving from server.      *
    /* @param: ProtoBuffer responseBody                       *
    /* @param: String operation                               *  
    /* @return: Object                                        *
    /*********************************************************/
    Handler.decode = function (responseBody, operation) {

        switch (operation) {
            // table operations
            case 'ListTable': return protoBufferDecode.decodeListTableResponse(responseBody);
            case 'CreateTable': return protoBufferDecode.decodeCreateTableResponse(responseBody);
            case 'DeleteTable': return protoBufferDecode.decodeDeleteTableResponse(responseBody);

            // single row operations
            case 'GetRow': return protoBufferDecode.decodeGetRowResponse(responseBody);
            case 'PutRow': return protoBufferDecode.decodePutRowResponse(responseBody);
            case 'UpdateRow': return protoBufferDecode.decodeUpdateRowResponse(responseBody);
            case 'DeleteRow': return protoBufferDecode.decodeDeleteRowResponse(responseBody);
        }
    };

    /*********************************************************/ 
    /* Send request to server.                                *
    /* @param: String url                                     *
    /* @param: object header                                  *
    /* @param: ProtoBuffer body                               *  
    /* @return: ProtoBufer response                           *
    /*********************************************************/
    Handler.sendRequest = function (url, header, body, operation) {
        
        var self = this;

        return $http.post(url, body, {
            headers: header
        }).then(function (res) {
            return self.decode(res.data, operation);
        });
    };

    /*********************************************************/
    /* Make request header.                                   *
    /* @param: ProtoBuffer requestBody                        *  
    /* @return: Object requestHeader                          *
    /*********************************************************/
    Handler.makeRequestHeader = function (requestBody, operation) {

        var today = new Date().toUTCString();
        var contentMD = this.base64_md5(requestBody);
        var signature = this.computeSignature(requestBody, operation);

        var requestHeader = {
            'x-ots-accesskeyid': ACCESSKEY_ID,
            'x-ots-apiversion': API_VERSION,
            'x-ots-contentmd5': contentMD,
            'x-ots-date': today,
            'x-ots-instancename': INSTANCE_NAME,                  
            'x-ots-signature': signature                   
        };

        return requestHeader;
    };

    /*********************************************************/
    /* Compute signature for request header.                  *
    /* @param: ProtoBuffer requestBody                        *  
    /* @param: String operaion                                *
    /* @return: String signature                              *
    /*********************************************************/
    Handler.computeSignature = function (requestBody, operation) {

        var today = new Date().toUTCString();
        var contentBody = this.base64_md5(requestBody);

        var headers = [
            'x-ots-accesskeyid:' + ACCESSKEY_ID,
            'x-ots-apiversion:' + API_VERSION,
            'x-ots-contentmd5:' + contentBody,
            'x-ots-date:' + today,
            'x-ots-instancename:' + INSTANCE_NAME
        ];
        var joinHeader = headers.join("\n");

        var stringToSign = "/" + operation + "\nPOST\n\n" + joinHeader + "\n";
        var signature = convertProvider.b64_hmac_sha1(SECRET_KEY, stringToSign);

        return signature;
    };

    /*********************************************************/
    /* Compute md5 of request body encoded by base64.         *
    /* @param: ProtoBuffer requestBody                        *  
    /* @return: String contentBody                            *
    /*********************************************************/
    Handler.base64_md5 = function (requestBody) {
        var contentMD = convertProvider.hextobin(md5.createHash(requestBody));
        var contentBody = $base64.encode(contentMD);
        return contentBody;
    };

    return Handler;
});