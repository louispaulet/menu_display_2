const I="data:text/markdown;base64,IyBMdWN1bWEgTW91c3NlIHdpdGggTWFyYWN1eWEgQ291bGlzIGFuZCBDaG9jb2xhdGUgQ3J1bWJsZQ0KDQojIyBJbmdyZWRpZW50cw0KDQojIyMgRm9yIHRoZSBMdWN1bWEgTW91c3NlOg0KLSA1MDBnIGx1Y3VtYSBwdWxwDQotIDMwMG1sIGhlYXZ5IGNyZWFtDQotIDMgdGFibGVzcG9vbnMgc3VnYXINCi0gMiB0ZWFzcG9vbnMgdW5mbGF2b3JlZCBnZWxhdGluDQotIDUwbWwgd2F0ZXINCi0gMSB0ZWFzcG9vbiB2YW5pbGxhIGV4dHJhY3QNCg0KIyMjIEZvciB0aGUgTWFyYWN1eWEgQ291bGlzOg0KLSAyMDBtbCBwYXNzaW9uIGZydWl0IChtYXJhY3V5YSkganVpY2UNCi0gMiB0YWJsZXNwb29ucyBzdWdhcg0KLSAxIHRlYXNwb29uIGNvcm5zdGFyY2ggbWl4ZWQgd2l0aCAxIHRhYmxlc3Bvb24gb2Ygd2F0ZXINCg0KIyMjIEZvciB0aGUgQ2hvY29sYXRlIENydW1ibGU6DQotIDEwMGcgYWxsLXB1cnBvc2UgZmxvdXINCi0gNTBnIHVuc3dlZXRlbmVkIGNvY29hIHBvd2Rlcg0KLSA3NWcgZ3JhbnVsYXRlZCBzdWdhcg0KLSA3NWcgdW5zYWx0ZWQgYnV0dGVyLCBjb2xkIGFuZCBjdWJlZA0KLSBBIHBpbmNoIG9mIHNhbHQNCg0KIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyBTdGVwIDE6IE1ha2UgdGhlIEx1Y3VtYSBNb3Vzc2UNCjEuICoqUHJlcGFyZSB0aGUgZ2VsYXRpbjoqKiBJbiBhIHNtYWxsIGJvd2wsIHNwcmlua2xlIHRoZSBnZWxhdGluIG92ZXIgdGhlIHdhdGVyIGFuZCBsZXQgaXQgc2l0IGZvciA1IG1pbnV0ZXMgdG8gYmxvb20uDQoyLiAqKkhlYXQgZ2VsYXRpbjoqKiBQbGFjZSB0aGUgYmxvb21lZCBnZWxhdGluIGluIHRoZSBtaWNyb3dhdmUgb3Igb3ZlciBhIGRvdWJsZSBib2lsZXIganVzdCB1bnRpbCBpdCBtZWx0cy4NCjMuICoqQmxlbmQgbHVjdW1hIHB1bHA6KiogSW4gYSBibGVuZGVyLCBjb21iaW5lIGx1Y3VtYSBwdWxwLCBzdWdhciwgYW5kIHZhbmlsbGEgZXh0cmFjdCB1bnRpbCBzbW9vdGguDQo0LiAqKk1peCBnZWxhdGluIGludG8gbHVjdW1hIGJsZW5kOioqIEFkZCB0aGUgbWVsdGVkIGdlbGF0aW4gdG8gdGhlIGx1Y3VtYSBtaXh0dXJlLCBtYWtlIHN1cmUgaXQncyBmdWxseSBpbmNvcnBvcmF0ZWQuDQo1LiAqKldoaXAgdGhlIGNyZWFtOioqIEluIGEgY2hpbGxlZCBib3dsLCB3aGlwIHRoZSBoZWF2eSBjcmVhbSB1bnRpbCBzb2Z0IHBlYWtzIGZvcm0uIEdlbnRseSBmb2xkIHRoZSB3aGlwcGVkIGNyZWFtIGludG8gdGhlIGx1Y3VtYSBtaXh0dXJlIHVudGlsIHVuaWZvcm0uDQo2LiAqKkNoaWxsOioqIFBvdXIgdGhlIG1vdXNzZSBpbnRvIHNlcnZpbmcgZ2xhc3NlcyBvciBhIGxhcmdlIHNlcnZpbmcgZGlzaCwgYW5kIHJlZnJpZ2VyYXRlIGZvciBhdCBsZWFzdCA0IGhvdXJzLCBvciB1bnRpbCBzZXQuDQoNCiMjIyBTdGVwIDI6IFByZXBhcmUgdGhlIE1hcmFjdXlhIENvdWxpcw0KMS4gKipDb21iaW5lIGluZ3JlZGllbnRzOioqIEluIGEgc21hbGwgc2F1Y2VwYW4sIGNvbWJpbmUgcGFzc2lvbiBmcnVpdCBqdWljZSBhbmQgc3VnYXIuDQoyLiAqKkhlYXQgdGhlIG1peHR1cmU6KiogQnJpbmcgdG8gYSBzaW1tZXIgb3ZlciBtZWRpdW0gaGVhdC4gQWRkIHRoZSBjb3Juc3RhcmNoIHNsdXJyeSB0byB0aGUgc2F1Y2VwYW4sIHN0aXJyaW5nIGNvbnN0YW50bHkgdW50aWwgaXQgdGhpY2tlbnMuDQozLiAqKkNvb2wgZG93bjoqKiBSZW1vdmUgZnJvbSBoZWF0IGFuZCBsZXQgY29vbC4gQ2hpbGwgdW50aWwgcmVhZHkgdG8gc2VydmUgd2l0aCBtb3Vzc2UuDQoNCiMjIyBTdGVwIDM6IE1ha2UgdGhlIENob2NvbGF0ZSBDcnVtYmxlDQoxLiAqKlByZWhlYXQgb3ZlbjoqKiBQcmVoZWF0IHlvdXIgb3ZlbiB0byAxODDCsEMgKDM1MMKwRikuDQoyLiAqKk1peCBkcnkgaW5ncmVkaWVudHM6KiogSW4gYSBib3dsLCB3aGlzayB0b2dldGhlciB0aGUgZmxvdXIsIGNvY29hIHBvd2Rlciwgc3VnYXIsIGFuZCBzYWx0Lg0KMy4gKipJbmNvcnBvcmF0ZSBidXR0ZXI6KiogQWRkIHRoZSBidXR0ZXIgY3ViZXMgYW5kLCB1c2luZyB5b3VyIGZpbmdlcnMgb3IgYSBwYXN0cnkgY3V0dGVyLCB3b3JrIHRoZSBtaXh0dXJlIGludG8gYSBjcnVtYmx5IHRleHR1cmUuDQo0LiAqKkJha2UgY3J1bWJsZToqKiBTcHJlYWQgdGhlIGNydW1ibGUgbWl4dHVyZSBvbnRvIGEgYmFraW5nIHNoZWV0IGxpbmVkIHdpdGggcGFyY2htZW50IHBhcGVyLCBhbmQgYmFrZSBmb3IgYWJvdXQgMTAtMTIgbWludXRlcywgb3IgdW50aWwgY3Jpc3B5Lg0KNS4gKipDb29sIGRvd246KiogQWxsb3cgdG8gY29vbCBiZWZvcmUgdXNpbmcuDQoNCiMjIEFzc2VtYmx5DQoxLiAqKkxheWVyaW5nOioqIEp1c3QgYmVmb3JlIHNlcnZpbmcsIGRyaXp6bGUgdGhlIG1hcmFjdXlhIGNvdWxpcyBvdmVyIHRoZSB0b3Agb2YgdGhlIGx1Y3VtYSBtb3Vzc2UuDQoyLiAqKkdhcm5pc2ggd2l0aCBjcnVtYmxlOioqIFNwcmlua2xlIHRoZSBjaG9jb2xhdGUgY3J1bWJsZSBnZW5lcm91c2x5IG9uIHRvcCBvciBhcm91bmQgdGhlIGRlc3NlcnQgZm9yIGFkZGVkIHRleHR1cmUuDQozLiAqKlNlcnZlOioqIFBhaXIgd2l0aCBhIGdsYXNzIG9mIFN1c2FuYSBCYWxibyBMYXRlIEhhcnZlc3QgTWFsYmVjIDIwMTcgdG8gY29tcGxlbWVudCB0aGUgZGVzc2VydCBmbGF2b3JzIHNwbGVuZGlkbHkuDQoNCiMjIE5vdGVzDQotIEx1Y3VtYSBjYW4gYmUgc291cmNlZCBmcm9tIHNwZWNpYWx0eSBncm9jZXJ5IHN0b3JlcyBpZiBub3QgbG9jYWxseSBhdmFpbGFibGU7IG9mdGVuIHNvbGQgZnJvemVuIG9yIGFzIGEgcHVyZWUuDQotIENvbnNpc3RlbmN5IG9mIG1vdXNzZSBtaWdodCB2YXJ5IGJhc2VkIG9uIHRoZSByaWNobmVzcyBvZiBsdWN1bWEsIGFkanVzdCB0aGUgZ2VsYXRpbiBhY2NvcmRpbmdseS4NCi0gVmFyaWF0aW9ucyBpbiB0aGUgc3dlZXRuZXNzIG9mIHBhc3Npb24gZnJ1aXQgY2FuIG9jY3VyLCBhZGp1c3Qgc3VnYXIgaW4gdGhlIGNvdWxpcyBhcyBuZWVkZWQuDQoNCkVuam95IHlvdXIgZGVsaWNpb3VzIGFuZCBleG90aWMgZGVzc2VydCwgdGluZ2VkIHdpdGggdGhlIGZsYXZvcnMgb2YgdHJvcGljYWwgbHVjdW1hIGFuZCB0YW5neSBwYXNzaW9uIGZydWl0LCBwZXJmZWN0bHkgb2Zmc2V0IGJ5IHRoZSBiaXR0ZXJzd2VldCBjaG9jb2xhdGUgY3J1bWJsZSE=";export{I as default};
