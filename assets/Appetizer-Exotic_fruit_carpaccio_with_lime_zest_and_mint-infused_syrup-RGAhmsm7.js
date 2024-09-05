const g="data:text/markdown;base64,IyMjIEV4b3RpYyBGcnVpdCBDYXJwYWNjaW8gd2l0aCBMaW1lIFplc3QgYW5kIE1pbnQtSW5mdXNlZCBTeXJ1cA0KDQoqKkluZ3JlZGllbnRzOioqDQoNCi0gKipGb3IgdGhlIENhcnBhY2NpbzoqKg0KICAtIDEgc21hbGwgcmlwZSBtYW5nbywgcGVlbGVkIGFuZCB0aGlubHkgc2xpY2VkDQogIC0gMSByaXBlIHBpbmVhcHBsZSwgcGVlbGVkLCBjb3JlZCwgYW5kIHRoaW5seSBzbGljZWQNCiAgLSAyIGtpd2lzLCBwZWVsZWQgYW5kIHRoaW5seSBzbGljZWQNCiAgLSAxIGRyYWdvbiBmcnVpdCwgcGVlbGVkIGFuZCB0aGlubHkgc2xpY2VkDQogIC0gMSBwYXBheWEsIHBlZWxlZCwgc2VlZGVkLCBhbmQgdGhpbmx5IHNsaWNlZA0KICAtIFplc3Qgb2YgMiBsaW1lcw0KICAtIEZyZXNoIG1pbnQgbGVhdmVzLCB0byBnYXJuaXNoDQoNCi0gKipGb3IgdGhlIE1pbnQtSW5mdXNlZCBTeXJ1cDoqKg0KICAtIDEvMiBjdXAgZ3JhbnVsYXRlZCBzdWdhcg0KICAtIDEvNCBjdXAgd2F0ZXINCiAgLSAxLzQgY3VwIGZyZXNoIGxpbWUganVpY2UNCiAgLSAxIGJ1bmNoIGZyZXNoIG1pbnQNCg0KKipJbnN0cnVjdGlvbnM6KioNCg0KMS4gKipQcmVwYXJlIHRoZSBNaW50LUluZnVzZWQgU3lydXA6KioNCiAgIC0gSW4gYSBzbWFsbCBzYXVjZXBhbiwgY29tYmluZSBncmFudWxhdGVkIHN1Z2FyIGFuZCB3YXRlciBvdmVyIG1lZGl1bSBoZWF0Lg0KICAgLSBTdGlyIHVudGlsIHN1Z2FyIGRpc3NvbHZlcyBjb21wbGV0ZWx5LCB0aGVuIGJyaW5nIHRvIGEgc2ltbWVyLg0KICAgLSBBZGQgZnJlc2ggbWludCBsZWF2ZXMgYW5kIGxpbWUganVpY2UsIHJlZHVjZSBoZWF0IHRvIGxvdywgYW5kIGxldCBzaW1tZXIgZm9yIDEwIG1pbnV0ZXMuDQogICAtIFJlbW92ZSBmcm9tIGhlYXQsIHN0cmFpbiB0aGUgc3lydXAgaW50byBhIGJvd2wsIGFuZCBsZXQgaXQgY29vbCBjb21wbGV0ZWx5Lg0KDQoyLiAqKlByZXBhcmUgdGhlIEZydWl0IENhcnBhY2NpbzoqKg0KICAgLSBPbiBhIGxhcmdlIHNlcnZpbmcgcGxhdHRlciwgYXJyYW5nZSB0aGUgdGhpbiBzbGljZXMgb2YgbWFuZ28sIHBpbmVhcHBsZSwga2l3aSwgZHJhZ29uIGZydWl0LCBhbmQgcGFwYXlhIGluIGEgYmVhdXRpZnVsIHBhdHRlcm4uDQogICAtIEVuc3VyZSB0aGUgc2xpY2VzIHNsaWdodGx5IG92ZXJsYXAgZWFjaCBvdGhlciB0byBjcmVhdGUgdGhlIGNhcnBhY2NpbyBlZmZlY3QuDQoNCjMuICoqQXNzZW1ibHk6KioNCiAgIC0gR2VuZXJvdXNseSBkcml6emxlIHRoZSBjb29sZWQgbWludC1pbmZ1c2VkIHN5cnVwIG92ZXIgdGhlIGZydWl0IHNsaWNlcy4NCiAgIC0gU3ByaW5rbGUgdGhlIGxpbWUgemVzdCBldmVubHkgYWNyb3NzIHRoZSBkaXNoLg0KICAgLSBHYXJuaXNoIHdpdGggZnJlc2ggbWludCBsZWF2ZXMgZm9yIGEgYnVyc3Qgb2YgY29sb3IgYW5kIGZsYXZvci4NCg0KNC4gKipTZXJ2aW5nOioqDQogICAtIFJlZnJpZ2VyYXRlIHRoZSBmcnVpdCBjYXJwYWNjaW8gZm9yIGF0IGxlYXN0IDMwIG1pbnV0ZXMgYmVmb3JlIHNlcnZpbmcgdG8gZW5oYW5jZSB0aGUgZmxhdm9ycy4NCiAgIC0gU2VydmUgY2hpbGxlZCBhcyBhIHJlZnJlc2hpbmcgYXBwZXRpemVyLCBpZGVhbGx5IHBhaXJlZCB3aXRoIERvbWFpbmUgSHVldCBWb3V2cmF5IE1vZWxsZXV4IExlIE1vbnQgMjAxOS4NCg0KKipUaXBzOioqDQotIEZvciBhbiBhZGRlZCBjcnVuY2gsIGxpZ2h0bHkgdG9hc3Qgc29tZSBjb2NvbnV0IGZsYWtlcyBhbmQgc3ByaW5rbGUgdGhlbSBvdmVyIHRoZSBjYXJwYWNjaW8ganVzdCBiZWZvcmUgc2VydmluZy4NCi0gVG8gZW5oYW5jZSB0aGUgcHJlc2VudGF0aW9uLCBzZXJ2ZSB0aGUgY2FycGFjY2lvIG9uIGEgY2hpbGxlZCBzaGVldCBvZiBzbGF0ZSBvciBtYXJibGUuIA0KDQpFbmpveSB5b3VyIGVsZWdhbnQgYW5kIHJlZnJlc2hpbmcgRXhvdGljIEZydWl0IENhcnBhY2NpbyE=";export{g as default};
