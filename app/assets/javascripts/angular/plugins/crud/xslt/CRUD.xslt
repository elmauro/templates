<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <xsl:for-each select="//properties">
      <xsl:variable name="entity" select="@entity" />
        <div ng-show="viewForm" class="panel panel-default col-md-6">
          <div class="panel-body">

            <div class="alert alert-danger" role="alert" ng-show="showMessage">
              <button type="button" class="close" ng-click="showMessage=false"  aria-label="Close">
                <span aria-hidden="true">times</span>
              </button>
              <p ng-repeat="error in errors">
              <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span class="sr-only">Error:</span>
              Error</p>
            </div>

            <div class="row">
              <div class="modal-header">
                  <h3 class="modal-title">{{Action}}</h3>
              </div>
              <div class="modal-body">

                 <form class="form-horizontal" role="form">

                  <xsl:for-each select="//control">  
                    <div class="form-group">
                      <label for="{@name}" class="col-lg-2 control-label"><xsl:value-of select="@description"/></label>
                      <div class="col-lg-10">
                        <input type="text" class="form-control" id="{@name}" placeholder="{@name}" ng-model="{$entity}.{@name}" />
                      </div>
                    </div>
                  </xsl:for-each>
                </form>
              </div>
              <div class="modal-footer">
                  <button class="btn btn-primary" ng-click="save({$entity})">SAVE</button>
                  <button class="btn btn-warning" ng-click="cancel()">Cancel</button>
              </div>
            </div>
          </div>
        </div>
    </xsl:for-each>
  </xsl:template> 
</xsl:stylesheet>
